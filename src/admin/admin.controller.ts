import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UseGuards } from "@nestjs/common";
import { Roles } from "../common/decarators/roles.decarators";
import { RolesGuard } from "../common/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AdminLoginDto } from "./dto/admin-login.dto";



@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post("login")
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto);
  }
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("create-employee")
  createEmployee(@Body() dto: any) {
    return this.adminService.createEmployee(dto);
  }
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("create-mla")
  createMla(@Body() dto: any) {
    console.log(dto);
    return this.adminService.createMla(dto);
  }
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("mlas")
  getMlas() {
    return this.adminService.getMlas();
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("mla/:id")
  updateMla(
    @Param("id") id: string,
    @Body() dto: any
  ) {
    return this.adminService.updateMla(id, dto);
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('mla-info/:constituencyId')
  async getMlaInfo(
    @Param('constituencyId') constituencyId: string,
  ) {
    return this.adminService.getMlaInfo(constituencyId);
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete("mla/:id")
  deleteMla(
    @Param("id") id: string
  ) {
    return this.adminService.deleteMla(id);
  }
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("employees")
  getEmployees() {
    return this.adminService.getEmployees();
  }
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("employee/:id")
  updateEmployee(
    @Param("id") id: string,
    @Body() dto: any
  ) {
    return this.adminService.updateEmployee(id, dto);
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete("employee/:id")
  deleteEmployee(
    @Param("id") id: string
  ) {
    return this.adminService.deleteEmployee(id);
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("create-citizen")
  createCitizen(@Body() dto: any) {
    return this.adminService.createCitizen(dto);
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("citizens")
  getCitizens() {
    return this.adminService.getCitizens();
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("citizen/:id")
  updateCitizen(
    @Param("id") id: string,
    @Body() dto: any,
  ) {
    return this.adminService.updateCitizen(id, dto);
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete("citizen/:id")
  deleteCitizen(
    @Param("id") id: string,
  ) {
    return this.adminService.deleteCitizen(id);
  }
}