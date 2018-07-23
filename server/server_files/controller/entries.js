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
}

export default Entries
