import entries from '../model/entries';
/**
 * @class entries
 */
class Entries {
    /**
     * @returns {Object} recipes
     * @param {*} req
     * @param {*} res
     */
    static getEntries(req, res) {
      return res.json({
        entries
      });
    }
    static retrieveEntry(req, res) {
      for (let i = 0; i < entries.length; i += 1) {
        if (entries[i].id === parseInt(req.params.id, 10)) {
          return res.json({
            entries: entries[i],
            message: 'success',
            error: false
          });
        }
      }
      return res.status(404).json({
        message: 'recipe not found',
        error: true
      });
    }
}

export default Entries