import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Pastbook,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPastbookController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/pastbooks', {
    responses: {
      '200': {
        description: 'Array of Pastbook\'s belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pastbook)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pastbook>,
  ): Promise<Pastbook[]> {
    return this.userRepository.pastbooks(id).find(filter);
  }

  @post('/users/{id}/pastbooks', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pastbook)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.username,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastbook, {
            title: 'NewPastbookInUser',
            exclude: ['id'],
            optional: ['username']
          }),
        },
      },
    }) pastbook: Omit<Pastbook, 'id'>,
  ): Promise<Pastbook> {
    return this.userRepository.pastbooks(id).create(pastbook);
  }

  @patch('/users/{id}/pastbooks', {
    responses: {
      '200': {
        description: 'User.Pastbook PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastbook, {partial: true}),
        },
      },
    })
    pastbook: Partial<Pastbook>,
    @param.query.object('where', getWhereSchemaFor(Pastbook)) where?: Where<Pastbook>,
  ): Promise<Count> {
    return this.userRepository.pastbooks(id).patch(pastbook, where);
  }

  @del('/users/{id}/pastbooks', {
    responses: {
      '200': {
        description: 'User.Pastbook DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pastbook)) where?: Where<Pastbook>,
  ): Promise<Count> {
    return this.userRepository.pastbooks(id).delete(where);
  }
}
