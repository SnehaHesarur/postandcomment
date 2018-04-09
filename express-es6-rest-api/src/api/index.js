import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import comments from './comments';
import { data }  from './comments';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/posts', facets({ config, db }));
	api.use('/comments', comments({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/com_post/:id', (req, res) => {
		let id = req.params.id;

		let val = [];
		let all = data();
		console.log(all);
		all.forEach(item => {
			console.log(item, id);
			if (item.postid == id) {
				val.push(item);
			}
		});
		res.json({comments: val});
	});
	return api;
}
