using FreightsManagementWPF.Helpers;
using FreightsManagementWPF.Models;
using FreightsManagementWPF.Services;

namespace FreightsManagementWPF.ViewModels
{
    /// <summary>
    /// ViewModel for the Registration window
    /// </summary>
    public class RegistrationViewModel : ViewModelBase
    {
        private readonly AuthenticationService _authService;
        private string _username = string.Empty;
        private string _email = string.Empty;
        private string _password = string.Empty;
        private string _confirmPassword = string.Empty;
        private string _firstName = string.Empty;
        private string _lastName = string.Empty;
        private string _errorMessage = string.Empty;
        private string _successMessage = string.Empty;
        private bool _isLoading;

        public RegistrationViewModel()
        {
            _authService = new AuthenticationService();
            RegisterCommand = new RelayCommand(async () => await RegisterAsync(), () => CanRegister);
            BackToLoginCommand = new RelayCommand(BackToLogin);
        }

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

        public string Password
        {
            get => _password;
            set => SetProperty(ref _password, value);
        }

        public string ConfirmPassword
        {
            get => _confirmPassword;
            set => SetProperty(ref _confirmPassword, value);
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

        public string ErrorMessage
        {
            get => _errorMessage;
            set => SetProperty(ref _errorMessage, value);
        }

        public string SuccessMessage
        {
            get => _successMessage;
            set => SetProperty(ref _successMessage, value);
        }

        public bool IsLoading
        {
            get => _isLoading;
            set => SetProperty(ref _isLoading, value);
        }

        public bool CanRegister => !IsLoading && 
            !string.IsNullOrWhiteSpace(Username) && 
            !string.IsNullOrWhiteSpace(Email) && 
            !string.IsNullOrWhiteSpace(Password) && 
            !string.IsNullOrWhiteSpace(ConfirmPassword) &&
            !string.IsNullOrWhiteSpace(FirstName) &&
            !string.IsNullOrWhiteSpace(LastName) &&
            Password == ConfirmPassword;

        public RelayCommand RegisterCommand { get; }
        public RelayCommand BackToLoginCommand { get; }

        public event EventHandler? RegistrationSuccessful;
        public event EventHandler? BackToLoginRequested;

        private async Task RegisterAsync()
        {
            try
            {
                IsLoading = true;
                ErrorMessage = string.Empty;
                SuccessMessage = string.Empty;

                if (Password != ConfirmPassword)
                {
                    ErrorMessage = "Passwords do not match.";
                    return;
                }

                var user = new User
                {
                    Username = Username,
                    Email = Email,
                    FirstName = FirstName,
                    LastName = LastName,
                    Role = "User"
                };

                var success = await _authService.RegisterAsync(user, Password);
                if (success)
                {
                    SuccessMessage = "Registration successful! You can now login.";
                    RegistrationSuccessful?.Invoke(this, EventArgs.Empty);
                }
                else
                {
                    ErrorMessage = "Registration failed. Username or email may already exist.";
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Registration failed: {ex.Message}";
            }
            finally
            {
                IsLoading = false;
            }
        }

        private void BackToLogin()
        {
            BackToLoginRequested?.Invoke(this, EventArgs.Empty);
        }
    }
}