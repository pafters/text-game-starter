window.onload = function () {
    const output = document.getElementById('output');
    const buttonsOutput = document.getElementById('buttonsOutput');

    const ceilingMsg = ['Вы смотрите на потолок, там записка', 'Вы смотрите на потолок, там ничего нет'];
    const toiletAnswR1 = 'Пойти в ванную';
    const ceilingAnswer = { returnNote: 'Вернуть записку на место', getNote: 'Достать записку', };

    const room1 = {
        roomCenter: [
            'Вы стоите в центре зала',
        ],
        ceiling: [
            ceilingMsg[0]
        ],
        note: [
            'Вы смотрите на записку...',
            'На записке надпись: "Сходи умойся"',
            '- Точно...',
            '- Потом...',
            'Записка Вам не отвечает.',
        ],
        window: [
            'Вы смотрите в окно...',
            '- Это я ничего не вижу дальше 2 метров после вчерашнего коньяка или это еще мир не придумали..?',
        ],
        ceilingNoteBack: [
            '[Голос, отдающийся эхом]: Серьезно, Вы приклеили записку обратно..? Ладно...',
        ]
    };

    const room1Answers = {
        roomCenter: [
            'Подойти к окну',
            'Посмотреть на потолок',
        ],
        note: [
            ceilingAnswer.getNote,
            'Осмотреться',
        ],
        ceiling: [
            'Перестать смотреть на потолок',
            ceilingAnswer.getNote
        ],
        window: [
            'Отойти от окна',
        ],
    }

    output.innerHTML += `<p>${room1.roomCenter[0]}</p>`;

    buttonsOutput.innerHTML = `
        <button>${room1Answers.roomCenter[0]}</button>
        <button>${room1Answers.roomCenter[1]}</button>
    `;


    function answerAnalise(answer) {
        switch (answer) {
            case room1Answers.roomCenter[0]: {
                showAnswerBtns(room1Answers.window);
                showMessage(room1.window);
                break;
            }

            case room1Answers.window[0]: {
                showAnswerBtns(room1Answers.roomCenter);
                showMessage(room1.roomCenter);
                break;
            }

            case room1Answers.roomCenter[1]: {
                showAnswerBtns(room1Answers.ceiling);
                showMessage(room1.ceiling);
                break;
            }

            case room1Answers.ceiling[0]: {
                showAnswerBtns(room1Answers.roomCenter);
                showMessage(room1.roomCenter);
                break;
            }

            case room1Answers.ceiling[1]: {
                (room1Answers.ceiling[1] === ceilingAnswer.getNote) ?
                    room1Answers.ceiling[1] = ceilingAnswer.returnNote :
                    (room1Answers.ceiling[1] === ceilingAnswer.returnNote) ?
                        room1Answers.ceiling[1] = ceilingAnswer.getNote : null;

                room1Answers.note[0] = room1Answers.ceiling[1];

                if (room1Answers.roomCenter.indexOf(toiletAnswR1) === -1)
                    room1Answers.roomCenter.push(toiletAnswR1);

                if (room1Answers.ceiling[1] === ceilingAnswer.getNote) {
                    showAnswerBtns(room1Answers.roomCenter);
                    showMessage(room1.ceilingNoteBack);
                    showMessage(room1.roomCenter);


                } else if (room1Answers.ceiling[1] === ceilingAnswer.returnNote) {
                    showAnswerBtns(room1Answers.note)
                    showMessage(room1.note);
                }
                break;
            }

            case room1Answers.note[1]: {
                showAnswerBtns(room1Answers.roomCenter);
                showMessage(room1.roomCenter);
            }

        }
    }

    showMessage = (roomPart) => {
        for (let i = 0; i < roomPart.length; i++) {
            setTimeout(() => {
                output.innerHTML += `<p>${roomPart[i]}</p>`;
            }, i * 1000);
        }
    }

    showAnswerBtns = (roomPart) => {
        buttonsOutput.innerHTML = ``;
        for (let i = 0; i < roomPart.length; i++) {
            buttonsOutput.innerHTML += `
                <button>${roomPart[i]}</button>
            `;
        }
    }

    document.addEventListener('click', function (e) {
        if (e.target.textContent) {
            let answer = e.target.textContent;
            answerAnalise(answer);
        }
    })
}