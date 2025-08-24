using FreightsManagementWPF.Helpers;
using FreightsManagementWPF.Models;
using FreightsManagementWPF.Services;
using System.Collections.ObjectModel;

namespace FreightsManagementWPF.ViewModels
{
    /// <summary>
    /// ViewModel for the main application window
    /// </summary>
    public class MainViewModel : ViewModelBase
    {
        private readonly ParcelService _parcelService;
        private readonly UserService _userService;
        private User _currentUser;
        private string _selectedView = "Dashboard";
        private Dictionary<string, int> _parcelStats = new();

        public MainViewModel(User currentUser)
        {
            _currentUser = currentUser;
            _parcelService = new ParcelService();
            _userService = new UserService();

            // Initialize commands
            NavigateCommand = new RelayCommand(Navigate);
            LogoutCommand = new RelayCommand(Logout);
            RefreshCommand = new RelayCommand(async () => await RefreshDataAsync());

            // Initialize child view models
            UsersViewModel = new UsersViewModel();
            ParcelsViewModel = new ParcelsViewModel(currentUser);

            // Load initial data
            _ = RefreshDataAsync();
        }

        public User CurrentUser
        {
            get => _currentUser;
            set => SetProperty(ref _currentUser, value);
        }

        public string SelectedView
        {
            get => _selectedView;
            set => SetProperty(ref _selectedView, value);
        }

        public Dictionary<string, int> ParcelStats
        {
            get => _parcelStats;
            set => SetProperty(ref _parcelStats, value);
        }

        public UsersViewModel UsersViewModel { get; }
        public ParcelsViewModel ParcelsViewModel { get; }

        public RelayCommand NavigateCommand { get; }
        public RelayCommand LogoutCommand { get; }
        public RelayCommand RefreshCommand { get; }

        public event EventHandler? LogoutRequested;

        // Dashboard statistics
        public int TotalParcels => ParcelStats.Values.Sum();
        public int PendingParcels => ParcelStats.GetValueOrDefault("Pending", 0);
        public int InTransitParcels => ParcelStats.GetValueOrDefault("InTransit", 0);
        public int DeliveredParcels => ParcelStats.GetValueOrDefault("Delivered", 0);

        private void Navigate(object? parameter)
        {
            if (parameter is string view)
            {
                SelectedView = view;
                OnPropertyChanged(nameof(IsDashboardSelected));
                OnPropertyChanged(nameof(IsUsersSelected));
                OnPropertyChanged(nameof(IsParcelsSelected));

                // Refresh data for the selected view
                switch (view)
                {
                    case "Users":
                        _ = UsersViewModel.LoadUsersAsync();
                        break;
                    case "Parcels":
                        _ = ParcelsViewModel.LoadParcelsAsync();
                        break;
                    case "Dashboard":
                        _ = RefreshDataAsync();
                        break;
                }
            }
        }

        private void Logout()
        {
            LogoutRequested?.Invoke(this, EventArgs.Empty);
        }

        private async Task RefreshDataAsync()
        {
            try
            {
                ParcelStats = await _parcelService.GetParcelStatisticsAsync();
                OnPropertyChanged(nameof(TotalParcels));
                OnPropertyChanged(nameof(PendingParcels));
                OnPropertyChanged(nameof(InTransitParcels));
                OnPropertyChanged(nameof(DeliveredParcels));
            }
            catch (Exception ex)
            {
                // Handle error - in actual WPF app, show message box or notification
                System.Diagnostics.Debug.WriteLine($"Error refreshing data: {ex.Message}");
            }
        }

        // Properties for view selection
        public bool IsDashboardSelected => SelectedView == "Dashboard";
        public bool IsUsersSelected => SelectedView == "Users";
        public bool IsParcelsSelected => SelectedView == "Parcels";

        // Check if current user is admin
        public bool IsAdmin => CurrentUser.Role == "Admin";
    }
}