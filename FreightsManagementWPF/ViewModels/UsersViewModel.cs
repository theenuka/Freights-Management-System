using FreightsManagementWPF.Helpers;
using FreightsManagementWPF.Models;
using FreightsManagementWPF.Services;
using System.Collections.ObjectModel;

namespace FreightsManagementWPF.ViewModels
{
    /// <summary>
    /// ViewModel for the Users management view
    /// </summary>
    public class UsersViewModel : ViewModelBase
    {
        private readonly UserService _userService;
        private ObservableCollection<User> _users = new();
        private User? _selectedUser;
        private bool _isLoading;
        private string _errorMessage = string.Empty;
        private bool _isEditMode;

        // Form fields
        private string _username = string.Empty;
        private string _email = string.Empty;
        private string _firstName = string.Empty;
        private string _lastName = string.Empty;
        private string _role = "User";
        private bool _isActive = true;
        private string _password = string.Empty;

        public UsersViewModel()
        {
            _userService = new UserService();

            // Commands
            LoadUsersCommand = new RelayCommand(async () => await LoadUsersAsync());
            AddUserCommand = new RelayCommand(AddUser);
            EditUserCommand = new RelayCommand(EditUser, () => SelectedUser != null);
            DeleteUserCommand = new RelayCommand(async () => await DeleteUserAsync(), () => SelectedUser != null);
            SaveUserCommand = new RelayCommand(async () => await SaveUserAsync(), () => CanSaveUser);
            CancelEditCommand = new RelayCommand(CancelEdit);

            // Load users initially
            _ = LoadUsersAsync();
        }

        public ObservableCollection<User> Users
        {
            get => _users;
            set => SetProperty(ref _users, value);
        }

        public User? SelectedUser
        {
            get => _selectedUser;
            set
            {
                SetProperty(ref _selectedUser, value);
                EditUserCommand.RaiseCanExecuteChanged();
                DeleteUserCommand.RaiseCanExecuteChanged();
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
        public string Username
        {
            get => _username;
            set => SetProperty(ref _username, value);
        }

        public string Email
        {
            get => _email;
            set => SetProperty(ref _email, value);
        }

        public string FirstName
        {
            get => _firstName;
            set => SetProperty(ref _firstName, value);
        }

        public string LastName
        {
            get => _lastName;
            set => SetProperty(ref _lastName, value);
        }

        public string Role
        {
            get => _role;
            set => SetProperty(ref _role, value);
        }

        public bool IsActive
        {
            get => _isActive;
            set => SetProperty(ref _isActive, value);
        }

        public string Password
        {
            get => _password;
            set => SetProperty(ref _password, value);
        }

        public bool CanSaveUser => !string.IsNullOrWhiteSpace(Username) &&
                                   !string.IsNullOrWhiteSpace(Email) &&
                                   !string.IsNullOrWhiteSpace(FirstName) &&
                                   !string.IsNullOrWhiteSpace(LastName) &&
                                   (!IsEditMode || !string.IsNullOrWhiteSpace(Password));

        // Commands
        public RelayCommand LoadUsersCommand { get; }
        public RelayCommand AddUserCommand { get; }
        public RelayCommand EditUserCommand { get; }
        public RelayCommand DeleteUserCommand { get; }
        public RelayCommand SaveUserCommand { get; }
        public RelayCommand CancelEditCommand { get; }

        public async Task LoadUsersAsync()
        {
            try
            {
                IsLoading = true;
                ErrorMessage = string.Empty;

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
            finally
            {
                IsLoading = false;
            }
        }

        private void AddUser()
        {
            ClearForm();
            IsEditMode = false;
        }

        private void EditUser()
        {
            if (SelectedUser != null)
            {
                Username = SelectedUser.Username;
                Email = SelectedUser.Email;
                FirstName = SelectedUser.FirstName;
                LastName = SelectedUser.LastName;
                Role = SelectedUser.Role;
                IsActive = SelectedUser.IsActive;
                Password = string.Empty; // Don't show existing password
                IsEditMode = true;
            }
        }

        private async Task DeleteUserAsync()
        {
            if (SelectedUser != null)
            {
                try
                {
                    IsLoading = true;
                    var success = await _userService.DeleteUserAsync(SelectedUser.Id);
                    if (success)
                    {
                        await LoadUsersAsync();
                        SelectedUser = null;
                    }
                    else
                    {
                        ErrorMessage = "Failed to delete user.";
                    }
                }
                catch (Exception ex)
                {
                    ErrorMessage = $"Failed to delete user: {ex.Message}";
                }
                finally
                {
                    IsLoading = false;
                }
            }
        }

        private async Task SaveUserAsync()
        {
            try
            {
                IsLoading = true;
                ErrorMessage = string.Empty;

                var user = new User
                {
                    Username = Username,
                    Email = Email,
                    FirstName = FirstName,
                    LastName = LastName,
                    Role = Role,
                    IsActive = IsActive
                };

                bool success;
                if (IsEditMode && SelectedUser != null)
                {
                    user.Id = SelectedUser.Id;
                    user.CreatedDate = SelectedUser.CreatedDate;
                    user.Password = SelectedUser.Password; // Keep existing password if not changed
                    
                    if (!string.IsNullOrWhiteSpace(Password))
                    {
                        // Update password if provided
                        await _userService.UpdatePasswordAsync(user.Id, Password);
                    }
                    
                    success = await _userService.UpdateUserAsync(user);
                }
                else
                {
                    success = await _userService.CreateUserAsync(user, Password);
                }

                if (success)
                {
                    await LoadUsersAsync();
                    ClearForm();
                    IsEditMode = false;
                }
                else
                {
                    ErrorMessage = "Failed to save user. Username or email may already exist.";
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Failed to save user: {ex.Message}";
            }
            finally
            {
                IsLoading = false;
            }
        }

        private void CancelEdit()
        {
            ClearForm();
            IsEditMode = false;
            SelectedUser = null;
        }

        private void ClearForm()
        {
            Username = string.Empty;
            Email = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
            Role = "User";
            IsActive = true;
            Password = string.Empty;
        }
    }
}