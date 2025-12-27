using Payments.Api.DTOs;
using Payments.Api.Entities;

namespace Payments.Api.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment> CreateAsync(CreatePaymentDto dto);
        Task<IEnumerable<Payment>> GetAllAsync();
        Task<Payment?> GetById(int id);
        Task<Payment> UpdateAsync(int id, UpdatePaymentDto dto);
        Task DeleteAsync(int id);
    }
}
