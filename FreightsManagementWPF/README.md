# Freights Management System - WPF Desktop Application

A complete WPF desktop application for managing freight operations with modern Material Design UI, built using .NET 8, Entity Framework Core, and SQLite database.

## 🚀 Features

- **User Authentication** - Secure login and registration system
- **Dashboard** - Real-time statistics and quick actions
- **Users Management** - Complete CRUD operations for user administration
- **Parcels Management** - Track and manage freight parcels with status updates
- **Modern UI** - Material Design interface with responsive layout
- **Database Integration** - SQLite database with Entity Framework Core
- **MVVM Architecture** - Clean separation of concerns
- **Role-based Access** - Admin and User roles with appropriate permissions

## 📋 Requirements

- **Windows OS** (for WPF functionality)
- **.NET 8.0 SDK** or later
- **Visual Studio 2022** or **Visual Studio Code** (recommended)
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/theenuka/Freights-Management-System.git
cd Freights-Management-System
```

### 2. Navigate to WPF Project
```bash
cd FreightsManagementWPF
```

### 3. Convert to Full WPF Project
Since this was developed in a Linux environment, you need to convert it to a proper WPF project on Windows:

#### Update the Project File
Edit `FreightsManagementWPF.csproj`:
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows</TargetFramework>
    <UseWPF>true</UseWPF>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
    <PackageReference Include="MaterialDesignThemes" Version="4.9.0" />
    <PackageReference Include="MaterialDesignColors" Version="2.1.4" />
    <PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />
  </ItemGroup>
</Project>
```

#### Update Code-Behind Files
Update the view code-behind files to inherit from proper WPF classes:

**Views/LoginWindow.xaml.cs:**
```csharp
using FreightsManagementWPF.ViewModels;
using System.Windows;
using System.Windows.Controls;

namespace FreightsManagementWPF.Views
{
    public partial class LoginWindow : Window
    {
        private readonly LoginViewModel _viewModel;

        public LoginWindow()
        {
            InitializeComponent();
            _viewModel = new LoginViewModel();
            DataContext = _viewModel;

            _viewModel.LoginSuccessful += OnLoginSuccessful;
            _viewModel.ShowRegistration += OnShowRegistration;

            // Handle password binding
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
```

**Views/RegistrationWindow.xaml.cs:**
```csharp
using FreightsManagementWPF.ViewModels;
using System.Windows;

namespace FreightsManagementWPF.Views
{
    public partial class RegistrationWindow : Window
    {
        private readonly RegistrationViewModel _viewModel;

        public RegistrationWindow()
        {
            InitializeComponent();
            _viewModel = new RegistrationViewModel();
            DataContext = _viewModel;

            _viewModel.RegistrationSuccessful += OnRegistrationSuccessful;
            _viewModel.BackToLoginRequested += OnBackToLoginRequested;

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
```

**Views/MainWindow.xaml.cs:**
```csharp
using FreightsManagementWPF.Models;
using FreightsManagementWPF.ViewModels;
using System.Windows;

namespace FreightsManagementWPF.Views
{
    public partial class MainWindow : Window
    {
        private readonly MainViewModel _viewModel;

        public MainWindow(User currentUser)
        {
            InitializeComponent();
            _viewModel = new MainViewModel(currentUser);
            DataContext = _viewModel;

            _viewModel.LogoutRequested += OnLogoutRequested;
        }

        private void OnLogoutRequested(object? sender, EventArgs e)
        {
            var loginWindow = new LoginWindow();
            loginWindow.Show();
            this.Close();
        }

        protected override void OnClosed(EventArgs e)
        {
            _viewModel.LogoutRequested -= OnLogoutRequested;
            base.OnClosed(e);
        }
    }
}
```

**Views/UsersView.xaml.cs:**
```csharp
using FreightsManagementWPF.ViewModels;
using System.Windows.Controls;

namespace FreightsManagementWPF.Views
{
    public partial class UsersView : UserControl
    {
        public UsersView()
        {
            InitializeComponent();
            
            PasswordBox.PasswordChanged += (s, e) =>
            {
                if (DataContext is UsersViewModel viewModel)
                {
                    viewModel.Password = PasswordBox.Password;
                }
            };
        }
    }
}
```

**Views/ParcelsView.xaml.cs:**
```csharp
using System.Windows.Controls;

namespace FreightsManagementWPF.Views
{
    public partial class ParcelsView : UserControl
    {
        public ParcelsView()
        {
            InitializeComponent();
        }
    }
}
```

#### Update RelayCommand for WPF
**Helpers/RelayCommand.cs:**
```csharp
using System.Windows.Input;

namespace FreightsManagementWPF.Helpers
{
    public class RelayCommand : ICommand
    {
        private readonly Action<object?> _execute;
        private readonly Func<object?, bool>? _canExecute;

        public RelayCommand(Action<object?> execute, Func<object?, bool>? canExecute = null)
        {
            _execute = execute ?? throw new ArgumentNullException(nameof(execute));
            _canExecute = canExecute;
        }

        public RelayCommand(Action execute, Func<bool>? canExecute = null)
        {
            _execute = _ => execute();
            _canExecute = canExecute == null ? null : _ => canExecute();
        }

        public event EventHandler? CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        public bool CanExecute(object? parameter)
        {
            return _canExecute?.Invoke(parameter) ?? true;
        }

        public void Execute(object? parameter)
        {
            _execute(parameter);
        }

        public void RaiseCanExecuteChanged()
        {
            CommandManager.InvalidateRequerySuggested();
        }
    }
}
```

### 4. Restore Packages and Build
```bash
dotnet restore
dotnet build
```

### 5. Run the Application
```bash
dotnet run
```

## 📊 Database Schema

### Users Table
- `Id` - Primary Key
- `Username` - Unique username
- `Email` - Unique email address
- `Password` - Hashed password (BCrypt)
- `FirstName` - User's first name
- `LastName` - User's last name
- `Role` - User role (Admin, User, Manager)
- `CreatedDate` - Account creation date
- `IsActive` - Account status

### Parcels Table
- `Id` - Primary Key
- `TrackingNumber` - Unique tracking identifier
- `SenderName` - Sender's full name
- `SenderAddress` - Sender's address
- `SenderPhone` - Sender's phone number
- `ReceiverName` - Receiver's full name
- `ReceiverAddress` - Receiver's address
- `ReceiverPhone` - Receiver's phone number
- `Weight` - Parcel weight in kg
- `Dimensions` - Parcel dimensions
- `Status` - Current status (Pending, InTransit, Delivered, Cancelled)
- `CreatedDate` - Creation date
- `DeliveryDate` - Delivery date (nullable)
- `UserId` - Foreign key to Users table

## 🏗️ Architecture

The application follows the MVVM (Model-View-ViewModel) pattern:

### Models
- `User.cs` - User entity
- `Parcel.cs` - Parcel entity  
- `DatabaseContext.cs` - Entity Framework context

### Views
- `LoginWindow.xaml` - User authentication
- `RegistrationWindow.xaml` - User registration
- `MainWindow.xaml` - Main application window with navigation
- `UsersView.xaml` - User management interface
- `ParcelsView.xaml` - Parcel management interface

### ViewModels
- `LoginViewModel.cs` - Login logic
- `RegistrationViewModel.cs` - Registration logic
- `MainViewModel.cs` - Main window navigation
- `UsersViewModel.cs` - User management operations
- `ParcelsViewModel.cs` - Parcel management operations

### Services
- `AuthenticationService.cs` - User authentication
- `UserService.cs` - User CRUD operations
- `ParcelService.cs` - Parcel CRUD operations

### Helpers
- `ViewModelBase.cs` - Base class for ViewModels
- `RelayCommand.cs` - Command implementation for MVVM

## 🎨 UI Features

- **Material Design** styling throughout the application
- **Responsive layout** that adapts to different screen sizes
- **Dark/Light theme** support via Material Design themes
- **Data validation** with error messages
- **Loading indicators** for async operations
- **Role-based UI** - Different interfaces for Admin vs User roles

## 🔐 Default Credentials

- **Username:** admin
- **Password:** admin123
- **Role:** Admin

## 📱 Usage

### Login
1. Launch the application
2. Enter username and password
3. Click "LOGIN" to authenticate

### Dashboard
- View parcel statistics (Total, Pending, In Transit, Delivered)
- Quick actions for common tasks
- Navigation to different modules

### User Management (Admin only)
- View all users in the system
- Add new users with role assignment
- Edit existing user information
- Delete users (with confirmation)
- Update user passwords

### Parcel Management
- View parcels (all for Admin, user-specific for regular users)
- Add new parcels with complete sender/receiver information
- Edit parcel details
- Update parcel status (Pending → In Transit → Delivered)
- Delete parcels
- Auto-generated tracking numbers

## 🛠️ Development

### Testing the Console Version
A console version is available for testing the core functionality without WPF dependencies:

```bash
cd FreightsManagementWPF
dotnet run
```

This will demonstrate:
- Database initialization
- User authentication
- Parcel creation and management
- All service layer functionality

### Adding New Features
1. **Models**: Add new entities to the `Models` folder
2. **Services**: Create service classes for business logic
3. **ViewModels**: Implement ViewModels for new views
4. **Views**: Create XAML views with Material Design styling

## 🔧 Configuration

### Database
The application uses SQLite by default. The database file (`freights.db`) is created automatically in the application directory.

To use a different database:
1. Update the connection string in `DatabaseContext.cs`
2. Install the appropriate Entity Framework provider
3. Update the `OnConfiguring` method

### Styling
Material Design themes can be customized in `App.xaml`:
```xml
<materialDesign:BundledTheme BaseTheme="Light" PrimaryColor="BlueGrey" SecondaryColor="Lime" />
```

## 📝 Future Enhancements

- **Reporting** - Generate PDF reports for parcels and users
- **Email Notifications** - Send status updates to customers
- **Barcode/QR Code** - Generate tracking codes
- **GPS Tracking** - Real-time location tracking
- **Payment Integration** - Handle shipping payments
- **Multi-language Support** - Internationalization
- **API Integration** - Connect with shipping carriers
- **Mobile App** - Companion mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Material Design in XAML** for the beautiful UI components
- **Entity Framework Core** for data access
- **BCrypt.NET** for secure password hashing
- **Microsoft WPF** for the desktop application framework

---

**Note:** This application was initially developed in a Linux environment for demonstration purposes. The complete WPF functionality requires Windows OS and the updates mentioned in the setup instructions above.