import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Pastbook extends Entity {
  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  grid: object[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  username?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pastbook>) {
    super(data);
  }
}

export interface PastbookRelations {
  // describe navigational properties here
}

export type PastbookWithRelations = Pastbook & PastbookRelations;
