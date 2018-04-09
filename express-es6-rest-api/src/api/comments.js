import resource from 'resource-router-middleware';
import comment from '../models/comment';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'comment',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		console.log(id, comment);
		let comments = [];
		comment.forEach(item => {
			if (item.postid == id) {
				comments.push(item);
			}
		})
		let err = '';
		callback(err, comments);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(comment);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		console.log(body);
		body.id = comment.length.toString(36);
		comment.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		comment.splice(comment.indexOf(facet), 1);
		res.sendStatus(204);
	}
});

export function data() {
	return comment;
}
