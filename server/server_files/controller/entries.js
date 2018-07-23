import entries from '../model/entries';
/**
 * @class entries
 */
class Entries {
    /**
     * @returns {Object} Entries
     * @param {*} req
     * @param {*} res
     */
    static getEntries(req, res) {
      return res.json({
        entries
      });
    }
     /**
   * @returns {Object} retrieveEntry
   * @param {*} req
   * @param {*} res
   */
    static retrieveEntry(req, res) {
      let i = 0;
      while(i < entries.length){
        if (entries[i].id === parseInt(req.params.id, 10)) {
          return res.json({
            entries: entries[i],
            message: 'entry retrieved',
          });
        }
        i++;
      }
      return res.status(404).json({
        message: 'entry not found',
        error: true
      });
    }
}

export default Entries
