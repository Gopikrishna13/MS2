using System;

namespace MotorBikeRental.Database.Entities
{
public class Admin
{
    public int AdminId { get; set; }  
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string NIC { get; set; }
    public string Email { get; set; }
   
}

}
