import { Injectable } from '@nestjs/common';
import { AdminDTO } from './admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
  ) {}
  getHello(): object {
    return { message: 'hello world' };
  }
  getAll(): object {
    return { message: 'all admin' };
  }
  getAdminByID(id: number): object {
    return { id: id };
  }

  searchAdmin(name: string, id: number): object {
    return { name: name, id: id };
  }

  async addAdmin(data: AdminDTO): Promise<AdminEntity> {
    return await this.adminRepo.save(data);
  }

  uploadNID(filename: string): object {
    return {
      message: 'NID image uploaded successfully (Under 2MB)',
      file: filename,
    };
  }
  updateAdmin(id: number, mydata: AdminDTO): object {
    return { id: id, updatedData: mydata };
  }

  deleteAdmin(id: number): object {
    return { deleted: id };
  }

  async changeStatus(id: number, status: string): Promise<any> {
    await this.adminRepo.update(id, { status: status });
    return { message: 'Status updated' };
  }

  async getInactiveAdmins(): Promise<AdminEntity[]> {
    return await this.adminRepo.find({ where: { status: 'inactive' } });
  }

  async getOlderAdmins(): Promise<AdminEntity[]> {
    return await this.adminRepo.find({ where: { age: MoreThan(40) } });
  }
}
