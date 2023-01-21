import { UserLdap } from "./user-ldap"

export const LDAP_USERS: UserLdap[] =[
    {
        id: 1,
        login: 'test.v1',
        nom: 'v1',
        prenom:'test',
        nomComplet: 'V1 test',
        motDePasse: 'test',
        mail: 'test@test.fr',
        role:'ROLE_USER',
        employeNumero: 1234,
        employeNiveau:128,
        dateEmbauche: '2020-01-01',
        publisherId: 1,
        active: true,
    },
    {
        id: 2,
        login: 'test.v2',
        nom: 'v2',
        prenom:'v2',
        nomComplet: 'v2 test',
        motDePasse: 'test',
        mail: 'testv2@test.fr',
        role:'ROLE_USER',
        employeNumero: 2234,
        employeNiveau:228,
        dateEmbauche: '2020-02-02',
        publisherId: 2,
        active: true,
    }
]