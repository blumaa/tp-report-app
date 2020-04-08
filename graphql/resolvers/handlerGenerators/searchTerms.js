import SearchTerm from '../../../models/searchTerms';

export async function createSearchTerm(args) {
    try {
      const {
        location
      } = args.searchTermInput; //retrieve values from arguments
      
      const searchTerm = new SearchTerm({
        location
      }, (err) => { if (err) throw err });
      searchTerm.save();
      // if user is registered without errors
      // create a token
    return { ...searchTerm._doc }
    }
    catch(err) {
      throw err;
    }
  }

  
export async function searchTerms(args) {
  try {
    const sTerms = await SearchTerm.findAll({ });
    return { sTerms }
  }
  catch (err) {
    throw err;
  }
}