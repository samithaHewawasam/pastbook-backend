import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Pastbook} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PastbookRepository} from './pastbook.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.username,
  UserRelations
> {

  public readonly pastbooks: HasManyRepositoryFactory<Pastbook, typeof User.prototype.username>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PastbookRepository') protected pastbookRepositoryGetter: Getter<PastbookRepository>,
  ) {
    super(User, dataSource);
    this.pastbooks = this.createHasManyRepositoryFactoryFor('pastbooks', pastbookRepositoryGetter,);
    this.registerInclusionResolver('pastbooks', this.pastbooks.inclusionResolver);
  }
}
