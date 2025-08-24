using FreightsManagementWPF.ViewModels;
using System;

namespace FreightsManagementWPF.Views
{
    /// <summary>
    /// Interaction logic for RegistrationWindow.xaml
    /// In actual WPF deployment, this would inherit from Window
    /// </summary>
    public partial class RegistrationWindow
    {
        private readonly RegistrationViewModel _viewModel;

        public RegistrationWindow()
        {
            // InitializeComponent(); // WPF-specific
            _viewModel = new RegistrationViewModel();
            // DataContext = _viewModel; // WPF-specific

            // Subscribe to events
            _viewModel.RegistrationSuccessful += OnRegistrationSuccessful;
            _viewModel.BackToLoginRequested += OnBackToLoginRequested;
        }

        private void OnRegistrationSuccessful(object? sender, EventArgs e)
        {
            // MessageBox.Show("Registration successful! You can now login with your credentials.", 
            //              "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            Console.WriteLine("Registration successful!");
            // this.Close();
        }

        private void OnBackToLoginRequested(object? sender, EventArgs e)
        {
            // this.Close();
        }

        protected virtual void OnClosed(EventArgs e)
        {
            _viewModel.RegistrationSuccessful -= OnRegistrationSuccessful;
            _viewModel.BackToLoginRequested -= OnBackToLoginRequested;
        }
    }
}