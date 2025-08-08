using FreightsManagementWPF.ViewModels;
using System;

namespace FreightsManagementWPF.Views
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// In actual WPF deployment, this would inherit from Window
    /// </summary>
    public partial class LoginWindow
    {
        private readonly LoginViewModel _viewModel;

        public LoginWindow()
        {
            // InitializeComponent(); // WPF-specific
            _viewModel = new LoginViewModel();
            // DataContext = _viewModel; // WPF-specific

            // Subscribe to events
            _viewModel.LoginSuccessful += OnLoginSuccessful;
            _viewModel.ShowRegistration += OnShowRegistration;
        }

        private void OnLoginSuccessful(object? sender, Models.User user)
        {
            var mainWindow = new MainWindow(user);
            // mainWindow.Show();
            // this.Close();
        }

        private void OnShowRegistration(object? sender, EventArgs e)
        {
            var registrationWindow = new RegistrationWindow();
            // registrationWindow.Owner = this;
            // registrationWindow.ShowDialog();
        }

        protected virtual void OnClosed(EventArgs e)
        {
            _viewModel.LoginSuccessful -= OnLoginSuccessful;
            _viewModel.ShowRegistration -= OnShowRegistration;
        }
    }
}