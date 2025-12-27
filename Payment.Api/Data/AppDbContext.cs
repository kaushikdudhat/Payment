using Microsoft.EntityFrameworkCore;
using Payments.Api.Entities;

namespace Payments.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Payment> Payments => Set<Payment>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Payment>()
                .HasIndex(p => p.ClientRequestId)
                .IsUnique();
        }
    }
}
