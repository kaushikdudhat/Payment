using Microsoft.AspNetCore.Mvc;
using Payments.Api.DTOs;
using Payments.Api.Services.Interfaces;

namespace Payments.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _service;

        public PaymentsController(IPaymentService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePaymentDto dto)
        {
            return Ok(await _service.CreateAsync(dto));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var payment = await _service.GetById(id);
            if (payment == null)
                return NotFound(new { message = "Payment not found" });

            return Ok(payment);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdatePaymentDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
