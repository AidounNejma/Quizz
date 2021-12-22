fetch('https://github.com/AidounNejma/Quizz/blob/main/assets/json/data.json')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.error(err));