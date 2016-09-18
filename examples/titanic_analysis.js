// In this example we will use dataframe-js to analyse a simple data set.
// You will find the code, explanations and results as comments.

// Here we import the lib.
// You can also: import { DataFrame } from 'dataframe-js';
const DataFrame = require('dataframe-js').DataFrame;

// Here we load the titanic data set from the well known Rdatasets (http://vincentarelbundock.github.io/Rdatasets/datasets.html).
// We get the result via a Promise, as a new DataFrame. We rename it 'df'.
DataFrame.fromCSV('http://vincentarelbundock.github.io/Rdatasets/csv/COUNT/titanic.csv').then(
    df => {
        // Let's go to display quicly our table.
        df.show();
        // It looks like that, with one passenger by line.
        // |           | class     | age       | sex       | survived  |
        // ------------------------------------------------------------
        // | 1         | 1st class | adults    | man       | yes       |
        // | 2         | 1st class | adults    | man       | yes       |
        // | 3         | 1st class | adults    | man       | yes       |
        // | 4         | 1st class | adults    | man       | yes       |
        // | 5         | 1st class | adults    | man       | yes       |
        // | 6         | 1st class | adults    | man       | yes       |
        // | 7         | 1st class | adults    | man       | yes       |
        // | 8         | 1st class | adults    | man       | yes       |
        // | 9         | 1st class | adults    | man       | yes       |
        // | 10        | 1st class | adults    | man       | yes       |

        // Ok, in the csv, the first column was row index named as ''. We will rename this column.
        const cleanDF = df.rename('', 'id');

        // If we look at columnNames, the row index is replaced by the 'id' column name.
        console.log(cleanDF.listColumns());
        // [ 'id', 'Class', 'Sex', 'Age', 'Survived', 'Freq' ]

        // Now, our DataFrame is 'clean' with. Let's go to a quick analysis.
        console.log(cleanDF.count()); // We have 1316 passengers in the Titanic.
        console.log(cleanDF.filter({survived: 'yes'}).count()); // We have 499 survivors.
        console.log(cleanDF.filter(row => row.get('survived') === 'no').count()); // and 817 died passengers.

        // Ok now we will count the number of passengers by class + age + sex by using groupBy and aggregation.
        const countByGroup = cleanDF.groupBy('class', 'age', 'sex', 'survived').aggregate(group => group.count());
        // Ok, now we can see the repartition of passengers by class + age + sex.
        // But it could be easier to read if we rename the aggregation and sort rows by count.
        const sortCountByGroup = countByGroup.rename('aggregation', 'count');

        // And now show the result
        sortCountByGroup.show();
        // | class     | age       | sex       | survived  | aggreg... |
        // ------------------------------------------------------------
        // | 3rd class | adults    | man       | no        | 387       |
        // | 2nd class | adults    | man       | no        | 154       |
        // | 1st class | adults    | women     | yes       | 140       |
        // | 1st class | adults    | man       | no        | 118       |
        // | 3rd class | adults    | women     | no        | 89        |
        // | 2nd class | adults    | women     | yes       | 80        |
        // | 3rd class | adults    | women     | yes       | 76        |
        // | 3rd class | adults    | man       | yes       | 75        |
        // | 1st class | adults    | man       | yes       | 57        |
        // | 3rd class | child     | man       | no        | 35        |



    }
);
