# terraform/cloudwatch.tf
# CloudWatch CPU alarms for app and Jenkins EC2 instances + SNS notifications

#------------------------------------------------------------------------------
# SNS Topic for Alarm Notifications
#------------------------------------------------------------------------------
resource "aws_sns_topic" "alerts" {
  name = "${local.name_prefix}-alerts"

  tags = {
    Name = "${local.name_prefix}-alerts"
  }
}

resource "aws_sns_topic_subscription" "email_alert" {
  count     = var.alert_email != "" ? 1 : 0
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

#------------------------------------------------------------------------------
# App Server CPU Alarm
#------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "app_cpu_high" {
  alarm_name          = "${local.name_prefix}-app-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "App server CPU above 80% for 10 minutes"
  treat_missing_data  = "notBreaching"

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
  ok_actions    = [aws_sns_topic.alerts.arn]

  tags = {
    Name = "${local.name_prefix}-app-cpu-high"
  }
}

#------------------------------------------------------------------------------
# Jenkins Server CPU Alarm
#------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "jenkins_cpu_high" {
  alarm_name          = "${local.name_prefix}-jenkins-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Jenkins server CPU above 80% for 10 minutes"
  treat_missing_data  = "notBreaching"

  dimensions = {
    InstanceId = aws_instance.jenkins_server.id
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
  ok_actions    = [aws_sns_topic.alerts.arn]

  tags = {
    Name = "${local.name_prefix}-jenkins-cpu-high"
  }
}

#------------------------------------------------------------------------------
# App Server StatusCheck Alarm (instance health)
#------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "app_status_check" {
  alarm_name          = "${local.name_prefix}-app-status-check"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "StatusCheckFailed"
  namespace           = "AWS/EC2"
  period              = 60
  statistic           = "Maximum"
  threshold           = 0
  alarm_description   = "App server instance status check failed"
  treat_missing_data  = "notBreaching"

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [aws_sns_topic.alerts.arn]

  tags = {
    Name = "${local.name_prefix}-app-status-check"
  }
}
