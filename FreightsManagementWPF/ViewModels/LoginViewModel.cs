using FreightsManagementWPF.Helpers;
using FreightsManagementWPF.Models;
using FreightsManagementWPF.Services;

namespace FreightsManagementWPF.ViewModels
{
    /// <summary>
    /// ViewModel for the Login window
    /// </summary>
    public class LoginViewModel : ViewModelBase
    {
        private readonly AuthenticationService _authService;
        private string _username = string.Empty;
        private string _password = string.Empty;
        private string _errorMessage = string.Empty;
        private bool _isLoading;

        public LoginViewModel()
        {
            _authService = new AuthenticationService();
            LoginCommand = new RelayCommand(async () => await LoginAsync(), () => CanLogin);
            RegisterCommand = new RelayCommand(ShowRegister);
        }

        public string Username
        {
            get => _username;
            set => SetProperty(ref _username, value);
        }

        public string Password
        {
            get => _password;
            set => SetProperty(ref _password, value);
        }

        public string ErrorMessage
        {
            get => _errorMessage;
            set => SetProperty(ref _errorMessage, value);
        }

        public bool IsLoading
        {
            get => _isLoading;
            set => SetProperty(ref _isLoading, value);
        }

        public bool CanLogin => !IsLoading && !string.IsNullOrWhiteSpace(Username) && !string.IsNullOrWhiteSpace(Password);

        public RelayCommand LoginCommand { get; }
        public RelayCommand RegisterCommand { get; }

        public event EventHandler<User>? LoginSuccessful;
        public event EventHandler? ShowRegistration;

        private async Task LoginAsync()
        {
            try
            {
                IsLoading = true;
                ErrorMessage = string.Empty;

                var user = await _authService.AuthenticateAsync(Username, Password);
                if (user != null)
                {
                    LoginSuccessful?.Invoke(this, user);
                }
                else
                {
                    ErrorMessage = "Invalid username or password.";
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Login failed: {ex.Message}";
            }
            finally
            {
                IsLoading = false;
            }
        }

        private void ShowRegister()
        {
            ShowRegistration?.Invoke(this, EventArgs.Empty);
        }
    }
}