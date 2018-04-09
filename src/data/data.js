const data = {
	can: {
		"dragDrop": [
			[
				{first: "I can", drop: "read", last: "books."},
				{first: "I can't", drop: "hear", last: "you! Speak up, please."},
				{first: "I can", drop: "clean", last: "my room."},
				{first: "Can you", drop: "open", last: "the window?"},
				{first: "Can you", drop: "go", last: "to school?"},
				{first: "He can", drop: "speak", last: "English."},
				{first: "You can", drop: "eat", last: "in this cafe."},
			],
			[
				{first: "He can", drop: "swim", last: "in the swimming pool."},
				{first: "Can you", drop: "hear", last: "me&"},
				{first: "I don't like to", drop: "clean", last: "my room."},
				{first: "Can you", drop: "open", last: "the window?"},
				{first: "They can", drop: "dance", last: "in the party."},
				{first: "I can't", drop: "cook", last: "sandwich."},
				{first: "You can't", drop: "eat", last: "my sandwich."},
			]
		],
		"sentences": [
			{id: 1, title: "Can you help me?", translation: "Можеш мені допомогти?"},
			{id: 2, title: "Can you open your eyes?", translation: "Можешь відкрити очі?"},
			{id: 3, title: "Can you cook?", translation: "Ти можешь готувати?"},
			{id: 4, title: "I can read.", translation: "Я можу читати."},
			{id: 5, title: "He can swim and run.", translation: "Він може плавати і бігати."},
			{id: 6, title: "Can a cat drive a car?", translation: "Чи може кіт водити машину?"},
		],
		"arrayPairs": [
			{en: "Can you help me?", ru: "Yes, I can."},
			{en: "Can you open your eyes?", ru: "Yes, I can."},
			{en: "Can you cook?", ru: "No, but I help my mother."},
			{en: "Can you swim?", ru: "Only in swimming pool."},
			{en: "I can make airplanes.", ru: "That's great!"},
			{en: "Can you hear me?", ru: "No, Speak up, please."},
			{en: "Can a cat drive a car?", ru: "No, it can't."},
			{en: "Can zebras climb a tree?", ru: "No, they can't."}
		],
		"correctSentence": [
			[
				{id: 1, sentence: "Can you jump and run?", isCorrect: "1"},
				{id: 2, sentence: "You can jump and run?", isCorrect: "0"},
				{id: 3, sentence: "Can you drink?", isCorrect: "1"},
				{id: 4, sentence: "Can you make a plane?", isCorrect: "1"},
				{id: 5, sentence: "You can make a plane?", isCorrect: "0"},
				{id: 6, sentence: "Can you help me?", isCorrect: "1"},
				{id: 7, sentence: "Can I help you?", isCorrect: "1"},
				{id: 8, sentence: "I can to read and write.", isCorrect: "0"},
				{id: 9, sentence: "I can read and write.", isCorrect: "1"},
				{id: 10, sentence: "He can swim and run.", isCorrect: "1"},
				{id: 11, sentence: "She can dance and draw.", isCorrect: "1"},
				{id: 11, sentence: "She can to dance and draw.", isCorrect: "1"},
				{id: 12, sentence: "Can zebras climb a tree? No, they can't.", isCorrect: "1"},
				{id: 13 sentence: "Can zebra climb a tree? No, they can't.", isCorrect: "0"},
			]
		]
	},
	"do-does": {
		"dragDrop": [
			[
				{first: "I like to", drop: "read", last: "books."},
				{first: "I like to", drop: "listen to", last: "music."},
				{first: "Does he like to", drop: "clean", last: "my room."},
				{first: "Do you", drop: "drink", last: "milk?"},
				{first: "She", drop: "drinks", last: "milk every morning."},
				{first: "Do you", drop: "go", last: "to school every weekday."},
				{first: "Does she", drop: "play", last: "computer games every day?"},
				{first: "He", drop: "plays", last: "computer games every day."},
				{first: "I", drop: "make", last: "my bed every day."},
				{first: "He", drop: "makes", last: "his bed every day."},
			]
		],
		"sentences": [
			{id: 1, title: "Does she play computer games every day?", translation: "Вона грає у компьютерні ігри щодня?"},
			{id: 2, title: "He drinks orange juice every morning.", translation: "Він п'є помарачевий сік кожний ранок."},
			{id: 3, title: "Do you eat eggs?", translation: "Ти вживаєшь яйця?"},
			{id: 4, title: "He doesn't make his bed every morning.", translation: "Він не запрівляє постіль кожний ранок."},
			{id: 5, title: "I don't watch TV in the evening.", translation: "Я не дивлюся телевізор щовечора."},
			{id: 6, title: "Does he can read?", translation: "Він вміє читати?"},
		],
		"arrayPairs": [
			{en: "Does she play computer games?", ru: "Yes, every day."},
			{en: "Does he can read?", ru: "No, he can't."},
			{en: "Do you go to school?", ru: "Yes, I am pupil."},
			{en: "Do we swim?", ru: "No, but I help my mother."},
			{en: "I can make airplanes.", ru: "That's great!"}
		],
		"correctSentence": [
			[
				{id: 1, sentence: "Can you jump and run?", isCorrect: "1"},
				{id: 2, sentence: "You can jump and run?", isCorrect: "0"},
				{id: 4, sentence: "Can you drinks?", isCorrect: "0"},
				{id: 5, sentence: "Can you make a plane?", isCorrect: "1"},

			]
		]
	},
	"like": {
		"dragDrop": [
			[
				{first: "I like to", drop: "read", last: "books."},
				{first: "I like to", drop: "listen to", last: "music."},
				{first: "I don't like to", drop: "clean", last: "my room."},
				{first: "I don't like to", drop: "write", last: "compositions."},
				{first: "I like", drop: "going", last: "to school."},
				{first: "I like", drop: "drinking", last: "milk."},
				{first: "I like", drop: "drawing", last: "pictures."},
				{first: "I don't like to", drop: "eat", last: "in cafe."},
			]
		],
		"sentences": [
			{id: 1, title: "I like to read books.", translation: "Мені подобається читати книжки."},
			{id: 2, title: "I don't like to clean my room.", translation: "Мені не подобається прибирать у кімнаті."},
			{id: 3, title: "I like watching TV.", translation: "Мені подобається дивиися телевізор."},
			{id: 4, title: "Do you like ice-ream?", translation: "Ти полюбляєш морозиво?"},
			{id: 5, title: "He doesn't like to swim.", translation: "Йому не подобаєтьсяя плавати."},
			{id: 6, title: "She doesn't like dancing.", translation: "Їй не подобається танцювати."},
			{id: 7, title: "We like playing computer games.", translation: "Ми любимо грати в компєютерні ігри."},
			{id: 8, title: "We doesn't like to eat cereal.", translation: "Нам не подобається їсти кашу."},
		],
		"arrayPairs": [
			{en: "Do you like ice-ream?", ru: "Yes, I do."},
			{en: "We like playing games.", ru: "Computer games?"},
			{en: "We doesn't like to eat cereal.", ru: "But you need it."},
			{en: "I like to read books.", ru: "Tell your favorite book."},
			{en: "Do you like Maths?", ru: "Yes, I do. I like do sums."}
		],
		"correctSentence": [
			[
				{id: 1, sentence: "Do you like ice-ream?", isCorrect: "1"},
				{id: 2, sentence: "You like ice-ream?", isCorrect: "0"},
				{id: 3, sentence: "I like to read books.", isCorrect: "1"},
				{id: 4, sentence: "He like to read books.", isCorrect: "0"},
				{id: 5, sentence: "He likes to read books.", isCorrect: "1"},
				{id: 6, sentence: "Do you like Art?", isCorrect: "1"},
			]
		]
	},
	"a-some": {
		"dragDrop": [
			[
				{first: "I like to", drop: "read", last: "books."},
				{first: "I like to", drop: "listen to", last: "music."},
				{first: "I don't like to", drop: "clean", last: "my room."},
				{first: "Can you", drop: "open", last: "the window?"},
				{first: "Let's", drop: "go", last: "to school."},
				{first: "I am", drop: "from", last: "Ukraine."},
				{first: "You can", drop: "eat", last: "in cafe."},
			]
		],
		"sentences": [
			{id: 1, title: "Can you help me?", translation: "Можеш мені допомогти?"},
			{id: 2, title: "Can you open your eyes?", translation: "Можешь відкрити очі?"},
			{id: 3, title: "Can you cook?", translation: "Ти можешь готувати?"},
			{id: 4, title: "I can read.", translation: "Я можу читати."},
			{id: 5, title: "He can swim and run.", translation: "Він може плавати і бігати."},
		],
		"arrayPairs": [
			{en: "Can you help me?", ru: "Yes, I can."},
			{en: "Can you open your eyes?", ru: "Yes, I can."},
			{en: "Can you cook?", ru: "No, I can't."},
			{en: "Can you cook?", ru: "No, but I help my mother."},
			{en: "I can make airplanes.", ru: "That's great!"}
		],
		"correctSentence": [
			[
				{id: 1, sentence: "Can you jump and run?", isCorrect: "1"},
				{id: 2, sentence: "You can jump and run?", isCorrect: "0"},
				{id: 4, sentence: "Can you drinks?", isCorrect: "0"},
				{id: 5, sentence: "Can you make a plane?", isCorrect: "1"},

			]
		]
	},
	"a-the": {
		"dragDrop": [
			[
				{first: "I like to", drop: "read", last: "books."},
				{first: "I like to", drop: "listen to", last: "music."},
				{first: "I don't like to", drop: "clean", last: "my room."},
				{first: "Can you", drop: "open", last: "the window?"},
				{first: "Let's", drop: "go", last: "to school."},
				{first: "I am", drop: "from", last: "Ukraine."},
				{first: "You can", drop: "eat", last: "in cafe."},
			]
		],
		"sentences": [
			{id: 1, title: "Can you help me?", translation: "Можеш мені допомогти?"},
			{id: 2, title: "Can you open your eyes?", translation: "Можешь відкрити очі?"},
			{id: 3, title: "Can you cook?", translation: "Ти можешь готувати?"},
			{id: 4, title: "I can read.", translation: "Я можу читати."},
			{id: 5, title: "He can swim and run.", translation: "Він може плавати і бігати."},
		],
		"arrayPairs": [
			{en: "Can you help me?", ru: "Yes, I can."},
			{en: "Can you open your eyes?", ru: "Yes, I can."},
			{en: "Can you cook?", ru: "No, I can't."},
			{en: "Can you cook?", ru: "No, but I help my mother."},
			{en: "I can make airplanes.", ru: "That's great!"}
		],
		"correctSentence": [
			[
				{id: 1, sentence: "Can you jump and run?", isCorrect: "1"},
				{id: 2, sentence: "You can jump and run?", isCorrect: "0"},
				{id: 4, sentence: "Can you drinks?", isCorrect: "0"},
				{id: 5, sentence: "Can you make a plane?", isCorrect: "1"},

			]
		]
	}
}
