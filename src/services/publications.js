(function($, Vue, Core, Shell, Landing) {

    Core.PublicationsFactory = function(owner) {

        return {

            // load: (data) => new Promise((resolve, reject) => {
            //
            //     owner.$http.get('/ws/publications', data).then(
            //         (d) => { resolve(d); },
            //         (e) => { reject(e); }
            //     );
            // }),

            create: (data) => new Promise((resolve, reject) => {

                var fd = new FormData();
                fd.append('title', data.title);
                fd.append('portal', data.portal);
                fd.append('thumbnail', data.thumbnail);

                owner.$http.post(`/ws/publications`, fd).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            update: (data) => new Promise((resolve, reject) => {

                var fd = new FormData();
                fd.append('title', data.title);
                if (data.thumbnail) {
                    fd.append('thumbnail', data.thumbnail);
                }

                owner.$http.put(`/ws/publications/${data.id}`, fd).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            remove: (data) => new Promise((resolve, reject) => {

                owner.$http.delete(`/ws/publications/${data.id}`).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),

            get: (data) => new Promise((resolve, reject) => {

                owner.$http.get(`/ws/publications/${data.id}`).then(
                    (d) => { resolve(d); },
                    (e) => { reject(e); }
                );
            }),
        };
    }

})(jQuery, Vue, Core, Shell, Landing);
