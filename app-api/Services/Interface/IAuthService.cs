namespace app_api.Services.Interface
{
    public interface IAuthService
    {
        public Task Logout(DateTime now);
    }

}
