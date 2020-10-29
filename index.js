$ = document.querySelector.bind(document);

var menu = $('#selectmenu');
var output = $('.output');

function setDNone() {
    for (i of output.children) {
        i.style.display = 'none';
    }
}

$('.ajax').addEventListener('click', function () {
    var selected = menu.selectedIndex;

    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var xml = xmlHttpRequest.responseXML;
            if (selected === 0) {
                let total = 0;
                var expenses = xml.getElementsByTagName('expense');
                for (let i of expenses) {
                    let amount = i.childNodes[1].childNodes[0].nodeValue;
                    total += Number(amount);
                }
                setDNone();
                $('.output .total .amount').innerText = total;
                $('.output .total').style.display = 'block';
            }
            else if (selected == 1) {
                setDNone();
                let mylist = document.querySelector('.summary');

                console.log(mylist.children);

                while(mylist.children.length > 2) {
                    console.log(mylist.lastChild);
                    mylist.removeChild(mylist.lastChild);
                }

                var expenses = xml.getElementsByTagName('expense');
                for (expense of expenses) {

                    let summaryDisplayer = document.createElement('div');
                    summaryDisplayer.setAttribute('class', 'expense');

                    let summaryChild1 = document.createElement('h4');
                    summaryChild1.setAttribute('class', 'e1');

                    let summaryChild2 = document.createElement('h4');
                    summaryChild2.setAttribute('class', 'e2');

                    summaryDisplayer.appendChild(summaryChild1);
                    summaryDisplayer.appendChild(summaryChild2);

                    summaryChild1.innerText = expense.children[0].firstChild.nodeValue;
                    summaryChild2.innerText = expense.children[1].firstChild.nodeValue;
                    $('.output .summary').appendChild(summaryDisplayer);
                }
                $('.output .summary').style.display = 'block';
            }
            else if (selected == 2) {
                setDNone();
                var income = xml.getElementsByTagName('income')[0].firstChild.nodeValue;
                $('.salary').innerText = income;
                $('.output .income').style.display = 'block';
            }
            else if (selected == 3) {
                setDNone();
                var expenses = xml.getElementsByTagName('expense');
                var income = xml.getElementsByTagName('income')[0].firstChild.nodeValue;
                var cost = 0;
                for (expense of expenses) {
                    cost += Number(expense.children[0].firstChild.nodeValue);
                }
                $('.output .balance .bal').innerText = income - cost;
                $('.output .balance').style.display = 'block';
            }
        }
    };

    xmlHttpRequest.open('GET', './data.xml', true);

    xmlHttpRequest.send();
})