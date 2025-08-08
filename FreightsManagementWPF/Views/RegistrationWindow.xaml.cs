using FreightsManagementWPF.ViewModels;
using System.Windows;
using System.Windows.Controls;

namespace FreightsManagementWPF.Views
{
    /// <summary>
    /// Interaction logic for RegistrationWindow.xaml
    /// </summary>
    public partial class RegistrationWindow : Window
    {
        private readonly RegistrationViewModel _viewModel;

        public RegistrationWindow()
        {
            InitializeComponent();
            _viewModel = new RegistrationViewModel();
            DataContext = _viewModel;

            // Subscribe to events
            _viewModel.RegistrationSuccessful += OnRegistrationSuccessful;
            _viewModel.BackToLoginRequested += OnBackToLoginRequested;

            // Handle password binding (PasswordBox doesn't support binding for security)
            PasswordBox.PasswordChanged += (s, e) => _viewModel.Password = PasswordBox.Password;
            ConfirmPasswordBox.PasswordChanged += (s, e) => _viewModel.ConfirmPassword = ConfirmPasswordBox.Password;
        }

        private void OnRegistrationSuccessful(object? sender, EventArgs e)
        {
            MessageBox.Show("Registration successful! You can now login with your credentials.", 
                          "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            this.Close();
        }

        private void OnBackToLoginRequested(object? sender, EventArgs e)
        {
            this.Close();
        }

        protected override void OnClosed(EventArgs e)
        {
            _viewModel.RegistrationSuccessful -= OnRegistrationSuccessful;
            _viewModel.BackToLoginRequested -= OnBackToLoginRequested;
            base.OnClosed(e);
        }
    }
}