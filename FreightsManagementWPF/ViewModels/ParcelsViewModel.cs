using FreightsManagementWPF.Helpers;
using FreightsManagementWPF.Models;
using FreightsManagementWPF.Services;
using System.Collections.ObjectModel;

namespace FreightsManagementWPF.ViewModels
{
    /// <summary>
    /// ViewModel for the Parcels management view
    /// </summary>
    public class ParcelsViewModel : ViewModelBase
    {
        private readonly ParcelService _parcelService;
        private readonly UserService _userService;
        private readonly User _currentUser;
        private ObservableCollection<Parcel> _parcels = new();
        private ObservableCollection<User> _users = new();
        private Parcel? _selectedParcel;
        private bool _isLoading;
        private string _errorMessage = string.Empty;
        private bool _isEditMode;

        // Form fields
        private string _trackingNumber = string.Empty;
        private string _senderName = string.Empty;
        private string _senderAddress = string.Empty;
        private string _senderPhone = string.Empty;
        private string _receiverName = string.Empty;
        private string _receiverAddress = string.Empty;
        private string _receiverPhone = string.Empty;
        private decimal _weight;
        private string _dimensions = string.Empty;
        private string _status = "Pending";
        private int _selectedUserId;

        public ParcelsViewModel(User currentUser)
        {
            _currentUser = currentUser;
            _parcelService = new ParcelService();
            _userService = new UserService();

            // Commands
            LoadParcelsCommand = new RelayCommand(async () => await LoadParcelsAsync());
            AddParcelCommand = new RelayCommand(AddParcel);
            EditParcelCommand = new RelayCommand(EditParcel, () => SelectedParcel != null);
            DeleteParcelCommand = new RelayCommand(async () => await DeleteParcelAsync(), () => SelectedParcel != null);
            SaveParcelCommand = new RelayCommand(async () => await SaveParcelAsync(), () => CanSaveParcel);
            CancelEditCommand = new RelayCommand(CancelEdit);
            UpdateStatusCommand = new RelayCommand(async (status) => await UpdateStatusAsync(status?.ToString() ?? ""));

            // Load data initially
            _ = LoadDataAsync();
        }

        public ObservableCollection<Parcel> Parcels
        {
            get => _parcels;
            set => SetProperty(ref _parcels, value);
        }

        public ObservableCollection<User> Users
        {
            get => _users;
            set => SetProperty(ref _users, value);
        }

        public Parcel? SelectedParcel
        {
            get => _selectedParcel;
            set
            {
                SetProperty(ref _selectedParcel, value);
                EditParcelCommand.RaiseCanExecuteChanged();
                DeleteParcelCommand.RaiseCanExecuteChanged();
            }
        }

        public bool IsLoading
        {
            get => _isLoading;
            set => SetProperty(ref _isLoading, value);
        }

        public string ErrorMessage
        {
            get => _errorMessage;
            set => SetProperty(ref _errorMessage, value);
        }

        public bool IsEditMode
        {
            get => _isEditMode;
            set => SetProperty(ref _isEditMode, value);
        }

        // Form properties
        public string TrackingNumber
        {
            get => _trackingNumber;
            set => SetProperty(ref _trackingNumber, value);
        }

        public string SenderName
        {
            get => _senderName;
            set => SetProperty(ref _senderName, value);
        }

        public string SenderAddress
        {
            get => _senderAddress;
            set => SetProperty(ref _senderAddress, value);
        }

        public string SenderPhone
        {
            get => _senderPhone;
            set => SetProperty(ref _senderPhone, value);
        }

        public string ReceiverName
        {
            get => _receiverName;
            set => SetProperty(ref _receiverName, value);
        }

        public string ReceiverAddress
        {
            get => _receiverAddress;
            set => SetProperty(ref _receiverAddress, value);
        }

        public string ReceiverPhone
        {
            get => _receiverPhone;
            set => SetProperty(ref _receiverPhone, value);
        }

        public decimal Weight
        {
            get => _weight;
            set => SetProperty(ref _weight, value);
        }

        public string Dimensions
        {
            get => _dimensions;
            set => SetProperty(ref _dimensions, value);
        }

        public string Status
        {
            get => _status;
            set => SetProperty(ref _status, value);
        }

        public int SelectedUserId
        {
            get => _selectedUserId;
            set => SetProperty(ref _selectedUserId, value);
        }

        public bool CanSaveParcel => !string.IsNullOrWhiteSpace(SenderName) &&
                                     !string.IsNullOrWhiteSpace(SenderAddress) &&
                                     !string.IsNullOrWhiteSpace(ReceiverName) &&
                                     !string.IsNullOrWhiteSpace(ReceiverAddress) &&
                                     Weight > 0 &&
                                     SelectedUserId > 0;

        // Status options
        public List<string> StatusOptions => new() { "Pending", "InTransit", "Delivered", "Cancelled" };

        // Check if current user is admin (can see all parcels and manage assignments)
        public bool IsAdmin => _currentUser.Role == "Admin";

        // Commands
        public RelayCommand LoadParcelsCommand { get; }
        public RelayCommand AddParcelCommand { get; }
        public RelayCommand EditParcelCommand { get; }
        public RelayCommand DeleteParcelCommand { get; }
        public RelayCommand SaveParcelCommand { get; }
        public RelayCommand CancelEditCommand { get; }
        public RelayCommand UpdateStatusCommand { get; }

        public async Task LoadParcelsAsync()
        {
            try
            {
                IsLoading = true;
                ErrorMessage = string.Empty;

                List<Parcel> parcels;
                if (IsAdmin)
                {
                    parcels = await _parcelService.GetAllParcelsAsync();
                }
                else
                {
                    parcels = await _parcelService.GetParcelsByUserIdAsync(_currentUser.Id);
                }

                Parcels.Clear();
                foreach (var parcel in parcels)
                {
                    Parcels.Add(parcel);
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Failed to load parcels: {ex.Message}";
            }
            finally
            {
                IsLoading = false;
            }
        }

        private async Task LoadUsersAsync()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                Users.Clear();
                foreach (var user in users)
                {
                    Users.Add(user);
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Failed to load users: {ex.Message}";
            }
        }

        private async Task LoadDataAsync()
        {
            await Task.WhenAll(LoadParcelsAsync(), LoadUsersAsync());
        }

        private void AddParcel()
        {
            ClearForm();
            SelectedUserId = _currentUser.Id; // Default to current user
            IsEditMode = false;
        }

        private void EditParcel()
        {
            if (SelectedParcel != null)
            {
                TrackingNumber = SelectedParcel.TrackingNumber;
                SenderName = SelectedParcel.SenderName;
                SenderAddress = SelectedParcel.SenderAddress;
                SenderPhone = SelectedParcel.SenderPhone;
                ReceiverName = SelectedParcel.ReceiverName;
                ReceiverAddress = SelectedParcel.ReceiverAddress;
                ReceiverPhone = SelectedParcel.ReceiverPhone;
                Weight = SelectedParcel.Weight;
                Dimensions = SelectedParcel.Dimensions;
                Status = SelectedParcel.Status;
                SelectedUserId = SelectedParcel.UserId;
                IsEditMode = true;
            }
        }

        private async Task DeleteParcelAsync()
        {
            if (SelectedParcel != null)
            {
                try
                {
                    IsLoading = true;
                    var success = await _parcelService.DeleteParcelAsync(SelectedParcel.Id);
                    if (success)
                    {
                        await LoadParcelsAsync();
                        SelectedParcel = null;
                    }
                    else
                    {
                        ErrorMessage = "Failed to delete parcel.";
                    }
                }
                catch (Exception ex)
                {
                    ErrorMessage = $"Failed to delete parcel: {ex.Message}";
                }
                finally
                {
                    IsLoading = false;
                }
            }
        }

        private async Task SaveParcelAsync()
        {
            try
            {
                IsLoading = true;
                ErrorMessage = string.Empty;

                var parcel = new Parcel
                {
                    TrackingNumber = TrackingNumber,
                    SenderName = SenderName,
                    SenderAddress = SenderAddress,
                    SenderPhone = SenderPhone,
                    ReceiverName = ReceiverName,
                    ReceiverAddress = ReceiverAddress,
                    ReceiverPhone = ReceiverPhone,
                    Weight = Weight,
                    Dimensions = Dimensions,
                    Status = Status,
                    UserId = SelectedUserId
                };

                bool success;
                if (IsEditMode && SelectedParcel != null)
                {
                    parcel.Id = SelectedParcel.Id;
                    parcel.CreatedDate = SelectedParcel.CreatedDate;
                    parcel.DeliveryDate = SelectedParcel.DeliveryDate;
                    success = await _parcelService.UpdateParcelAsync(parcel);
                }
                else
                {
                    success = await _parcelService.CreateParcelAsync(parcel);
                }

                if (success)
                {
                    await LoadParcelsAsync();
                    ClearForm();
                    IsEditMode = false;
                }
                else
                {
                    ErrorMessage = "Failed to save parcel. Tracking number may already exist.";
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Failed to save parcel: {ex.Message}";
            }
            finally
            {
                IsLoading = false;
            }
        }

        private async Task UpdateStatusAsync(string newStatus)
        {
            if (SelectedParcel != null && !string.IsNullOrEmpty(newStatus))
            {
                try
                {
                    IsLoading = true;
                    var success = await _parcelService.UpdateParcelStatusAsync(SelectedParcel.Id, newStatus);
                    if (success)
                    {
                        await LoadParcelsAsync();
                    }
                    else
                    {
                        ErrorMessage = "Failed to update parcel status.";
                    }
                }
                catch (Exception ex)
                {
                    ErrorMessage = $"Failed to update status: {ex.Message}";
                }
                finally
                {
                    IsLoading = false;
                }
            }
        }

        private void CancelEdit()
        {
            ClearForm();
            IsEditMode = false;
            SelectedParcel = null;
        }

        private void ClearForm()
        {
            TrackingNumber = string.Empty;
            SenderName = string.Empty;
            SenderAddress = string.Empty;
            SenderPhone = string.Empty;
            ReceiverName = string.Empty;
            ReceiverAddress = string.Empty;
            ReceiverPhone = string.Empty;
            Weight = 0;
            Dimensions = string.Empty;
            Status = "Pending";
            SelectedUserId = _currentUser.Id;
        }
    }
}