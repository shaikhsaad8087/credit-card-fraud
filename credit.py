import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression

credit_data = pd.read_csv("creditcard.csv")



# print(credit_data.head())

# print(credit_data.info())

# print(credit_data.isnull().sum())


print(credit_data['Class'].value_counts())

##this dataset highly unbalanced
##sepreating the data for analysis



legit = credit_data[credit_data.Class == 0]
fraud = credit_data[credit_data.Class == 1]

# print(legit.shape)
# print(fraud.shape)


##statistical mesure data

print(legit.Amount.describe())
print(fraud.Amount.describe())


##comparing the values of both transactions

print(credit_data.groupby('Class').mean())


#build sample of normal transactions

legit_sample = legit.sample(n=492)

#concatinate the two dataframes

new_dataset = pd.concat([legit_sample, fraud], axis=0)

print(new_dataset['Class'].value_counts())


X = new_dataset.drop(['Class'], axis=1)
y = new_dataset['Class']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=2)

# print(X_train.shape)
# print(X_test.shape)


#model traing

model = LogisticRegression()

model.fit(X_train, y_train)

##evolution

X_Train_prediction = model.predict(X_train)

training_data_accuracy = accuracy_score(X_Train_prediction, y_train)

print("Accuracy on training data : ", training_data_accuracy)

#accuracy on test data

X_test_prediction = model.predict(X_test)

test_data_accuracy = accuracy_score(X_test_prediction, y_test)

print("Accuracy on test data : ", test_data_accuracy)
