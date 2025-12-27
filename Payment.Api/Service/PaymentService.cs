using Microsoft.EntityFrameworkCore;
using Payments.Api.Data;
using Payments.Api.DTOs;
using Payments.Api.Entities;
using Payments.Api.Services.Interfaces;

namespace Payments.Api.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> CreateAsync(CreatePaymentDto dto)
        {
            var existing = await _context.Payments
                .FirstOrDefaultAsync(x => x.ClientRequestId == dto.ClientRequestId);

            if (existing != null)
                return existing;

            var today = DateTime.UtcNow.Date;
            var countToday = await _context.Payments
                .CountAsync(p => p.CreatedAt.Date == today);

            var payment = new Payment
            {
                ClientRequestId = dto.ClientRequestId,
                Amount = dto.Amount,
                Currency = dto.Currency,
                CreatedAt = DateTime.UtcNow,
                Reference = $"PAY-{today:yyyyMMdd}-{(countToday + 1):D4}"
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return payment;
        }

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            return await _context.Payments
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<Payment?> GetById(int id)
        {
            return await _context.Payments.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Payment> UpdateAsync(int id, UpdatePaymentDto dto)
        {
            if (dto.Amount <= 0)
                throw new ArgumentException("Amount must be greater than zero");

            var allowedCurrencies = new[] { "USD", "EUR", "INR", "GBP" };
            if (!allowedCurrencies.Contains(dto.Currency))
                throw new ArgumentException("Invalid currency");

            var payment = await _context.Payments.FindAsync(id);

            if (payment == null)
                throw new KeyNotFoundException("Payment not found");

            payment.Amount = dto.Amount;
            payment.Currency = dto.Currency;

            await _context.SaveChangesAsync();

            return payment;
        }

        public async Task DeleteAsync(int id)
        {
            var payment = await _context.Payments.FindAsync(id);

            if (payment == null)
                throw new KeyNotFoundException("Payment not found");

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
        }

    }
}
