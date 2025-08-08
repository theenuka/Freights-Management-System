using FreightsManagementWPF.ViewModels;
using System.Windows;
using System.Windows.Controls;

namespace FreightsManagementWPF.Views
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        private readonly LoginViewModel _viewModel;

        public LoginWindow()
        {
            InitializeComponent();
            _viewModel = new LoginViewModel();
            DataContext = _viewModel;

            // Subscribe to events
            _viewModel.LoginSuccessful += OnLoginSuccessful;
            _viewModel.ShowRegistration += OnShowRegistration;

            // Handle password binding (PasswordBox doesn't support binding for security)
            PasswordBox.PasswordChanged += (s, e) => _viewModel.Password = PasswordBox.Password;
        }

        private void OnLoginSuccessful(object? sender, Models.User user)
        {
            var mainWindow = new MainWindow(user);
            mainWindow.Show();
            this.Close();
        }

        private void OnShowRegistration(object? sender, EventArgs e)
        {
            var registrationWindow = new RegistrationWindow();
            registrationWindow.Owner = this;
            registrationWindow.ShowDialog();
        }

        protected override void OnClosed(EventArgs e)
        {
            _viewModel.LoginSuccessful -= OnLoginSuccessful;
            _viewModel.ShowRegistration -= OnShowRegistration;
            base.OnClosed(e);
        }
    }
}