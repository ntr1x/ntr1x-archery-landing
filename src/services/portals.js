(function($, Vue, Core) {

    Core.PortalsFactory = function(owner) {

        return {

            load: (data) => new Promise((resolve, reject) => {

                owner.$http.get('/ws/portals', data).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            create: (data) => new Promise((resolve, reject) => {

                owner.$http.post('/ws/portals', data).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            remove: (data) => new Promise((resolve, reject) => {

                owner.$http.delete(`/ws/portals/${data.id}`).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            publish: (data) => new Promise((resolve, reject) => {

                var fd = new FormData();
                fd.append('title', data.title);
                fd.append('thumbnail', data.thumbnail);

                owner.$http.post(`/ws/portals/${data.id}/publication`, fd).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            unpublish: (data) => new Promise((resolve, reject) => {

                var fd = new FormData();

                owner.$http.delete(`/ws/portals/${data.id}/publication`, fd).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            get: (data) => new Promise((resolve, reject) => {

                owner.$http.get(`/ws/portals/${data.id}`).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),
        };
    }

})(jQuery, Vue, Core);
