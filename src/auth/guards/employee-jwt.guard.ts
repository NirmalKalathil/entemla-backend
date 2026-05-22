import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class EmployeeJwtGuard extends AuthGuard('employee-jwt') {}