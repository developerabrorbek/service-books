import { Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from 'rxjs'

@Catch(RpcException)
export class RcpExceptionFilter implements ExceptionFilter {
  catch(exception: any): Observable<any> {
      return throwError(() => exception.response)
  }
}
