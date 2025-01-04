import { Controller, Get, Post,Request, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsergroupService } from 'src/usergroup/usergroup.service';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from './entities/roles.guard';
import { Roles } from './entities/roles.decorator';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private _UsergroupService: UsergroupService,
  ) { }
  @Post('login')
  async login(@Body() user: any) {
    return await this.usersService.login(user);
  }
  @Post('loginbygoogle')
  async loginbygoogle(@Body() user: any) {    
    return await this.usersService.loginsocial(user);
  }
  @Post('randompass')
  async randompass(@Body() dulieu: any) {
    return await this.randompass(dulieu);
  }
  @Get('profile')
  @UseGuards(AuthGuard('websitetoken'))
  async getProfile(@Request() req) {    
    const userPromise = this.usersService.findbyEmail(req.user);
    const groupsPromise = this._UsergroupService.findAll();
    const [user, Groups] = await Promise.all([userPromise, groupsPromise]); 
    if (user) {
      delete user.password;
      user['Groups'] = Groups.find((v) => v.id == user.idGroup)?.ListMenu;
    //  user['Groups'] = user['Groups'].filter((v:any) => v.Checked == true);
      return user;
    } else {
      return false;
    } 
  }
  @Post("register")
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newUser = await this.usersService.create(createUserDto);
    if (newUser[0]) {
      //this._emailService.sendEmail(newUser[1])
      return [true, 'Đăng Ký Thành Công'];
    }
    else {
      return newUser
    }
  }
  @Post("checksocial")
  async checksocial(@Body() data: any) {
    const newUser = await this.usersService.loginsocial(data);
    // if (newUser[0]) {
    //   //this._emailService.sendEmail(newUser[1])
    //   return [true, 'Đăng Ký Thành Công'];
    // }
    // else {
    //   return newUser
    // }
  }
  @Get()
  @UseGuards(AuthGuard('websitetoken'),RolesGuard)
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.read(id);
  }
  @Get('findid/:id')
  async findid(@Param('id') id: string) {
    const user = await this.usersService.findid(id);
    const Groups = await this._UsergroupService.findAll()
    user['Groups'] = Groups.find((v) => v.id == user.idGroup)?.ListMenu
    return user
  }
  @Get('SDT/:sdt')
  async findSDT(@Param('sdt') sdt: string) {
    const user = await this.usersService.findSDT(sdt);
    const Groups = await this._UsergroupService.findAll()
    user['Groups'] = Groups.find((v) => v.id == user.idGroup)
    return user
  }
  @Get('/get/admin')
  @UseGuards(AuthGuard('websitetoken'))
  findAdmin() {
    return this.usersService.findAdmin();
  }
  @Post('search')
  async findQuery(@Body() SearchParams: any) {
    console.log(SearchParams);
    
    return await this.usersService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Post('changepass')
  changepass(@Body() data: any) {
    return this.usersService.changepass(data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
