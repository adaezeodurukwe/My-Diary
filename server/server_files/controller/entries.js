import entries from '../model/entries';
/**
 * @class entries
 */
class Entries {
  /**
   * @returns {Object} entries
   * @param {*} req
   * @param {*} res
   */
  static getEntries(req, res) {
    return res.json({
      entries
    });
  }
  /**
   * @returns {object} removeEntry
   * @param {*} req
   * @param {*} res
   */
  static deleteEntry(req, res) {
    let i = 0;
    while(i < entries.length){
      if (entries[i].id === parseInt(req.params.id, 10)) {
        entries.splice(i, 1);
        return res.json({
          message: 'entry removed',
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
