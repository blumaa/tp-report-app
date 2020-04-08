import * as authHandlers from './handlerGenerators/auth';
import * as searchTerms from './handlerGenerators/searchTerms'

export default {
    ...authHandlers,
    ...searchTerms
}
