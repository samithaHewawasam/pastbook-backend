import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Pastbook} from '../models';
import {PastbookRepository} from '../repositories';

export class PastbookController {
  constructor(
    @repository(PastbookRepository)
    public pastbookRepository : PastbookRepository,
  ) {}

  @post('/pastbooks', {
    responses: {
      '200': {
        description: 'Pastbook model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pastbook)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastbook, {
            title: 'NewPastbook',
            exclude: ['id'],
          }),
        },
      },
    })
    pastbook: Omit<Pastbook, 'id'>,
  ): Promise<Pastbook> {
    return this.pastbookRepository.create(pastbook);
  }

  @get('/pastbooks/count', {
    responses: {
      '200': {
        description: 'Pastbook model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pastbook)) where?: Where<Pastbook>,
  ): Promise<Count> {
    return this.pastbookRepository.count(where);
  }

  @get('/pastbooks', {
    responses: {
      '200': {
        description: 'Array of Pastbook model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pastbook, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pastbook)) filter?: Filter<Pastbook>,
  ): Promise<Pastbook[]> {
    return this.pastbookRepository.find(filter);
  }

  @patch('/pastbooks', {
    responses: {
      '200': {
        description: 'Pastbook PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastbook, {partial: true}),
        },
      },
    })
    pastbook: Pastbook,
    @param.query.object('where', getWhereSchemaFor(Pastbook)) where?: Where<Pastbook>,
  ): Promise<Count> {
    return this.pastbookRepository.updateAll(pastbook, where);
  }

  @get('/pastbooks/{id}', {
    responses: {
      '200': {
        description: 'Pastbook model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pastbook, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Pastbook)) filter?: Filter<Pastbook>
  ): Promise<Pastbook> {
    return this.pastbookRepository.findById(id, filter);
  }

  @patch('/pastbooks/{id}', {
    responses: {
      '204': {
        description: 'Pastbook PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastbook, {partial: true}),
        },
      },
    })
    pastbook: Pastbook,
  ): Promise<void> {
    await this.pastbookRepository.updateById(id, pastbook);
  }

  @put('/pastbooks/{id}', {
    responses: {
      '204': {
        description: 'Pastbook PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pastbook: Pastbook,
  ): Promise<void> {
    await this.pastbookRepository.replaceById(id, pastbook);
  }

  @del('/pastbooks/{id}', {
    responses: {
      '204': {
        description: 'Pastbook DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pastbookRepository.deleteById(id);
  }
}
