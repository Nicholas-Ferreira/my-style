import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PagarmeService } from 'src/lib/pagarme';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, PagarmeService]
})
export class PaymentModule { }
