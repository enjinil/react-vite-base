import {faker} from '@faker-js/faker'

export const buildUser = () => {
  return {
    username: faker.person.firstName().toLowerCase() + faker.string.numeric(4),
    password: faker.string.binary({length: 5}),
  }
}
