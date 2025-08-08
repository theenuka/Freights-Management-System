using FreightsManagementWPF.Models;
using FreightsManagementWPF.ViewModels;
using System;

namespace FreightsManagementWPF.Views
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// In actual WPF deployment, this would inherit from Window
    /// </summary>
    public partial class MainWindow
    {
        private readonly MainViewModel _viewModel;

        public MainWindow(User currentUser)
        {
            // InitializeComponent(); // WPF-specific
            _viewModel = new MainViewModel(currentUser);
            // DataContext = _viewModel; // WPF-specific

            // Subscribe to events
            _viewModel.LogoutRequested += OnLogoutRequested;
        }

        private void OnLogoutRequested(object? sender, EventArgs e)
        {
            var loginWindow = new LoginWindow();
            // loginWindow.Show();
            // this.Close();
        }

        protected virtual void OnClosed(EventArgs e)
        {
            _viewModel.LogoutRequested -= OnLogoutRequested;
        }
    }
}