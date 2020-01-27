import {DefaultCrudRepository} from '@loopback/repository';
import {Pastbook, PastbookRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PastbookRepository extends DefaultCrudRepository<
  Pastbook,
  typeof Pastbook.prototype.id,
  PastbookRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Pastbook, dataSource);
  }
}
