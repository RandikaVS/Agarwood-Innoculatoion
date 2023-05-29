# %%
# Width, Age, Temperature, Rain expected in 2 weeks, SoilType,WhiteRoots, PestAttacks, FloweringSeason

# %%
import pandas as pd
import pickle
from sklearn.preprocessing import MinMaxScaler
# from tensorflow.keras.models import load_model
from tensorflow import keras
import sys

array = [25, 8, 29, 0, 0, 0, 0, 0]
array[0] = int(sys.argv[1])
array[1] = int(sys.argv[2])
array[2] = int(sys.argv[3])
array[3] = int(sys.argv[4])
array[4] = int(sys.argv[5])
array[5] = int(sys.argv[6])
array[6] = int(sys.argv[7])
array[7] = int(sys.argv[8])


with open('F:/SubProjets/Agarwood/1121/backend/ML/fit.pickle', 'rb') as file:
        fit_data = pickle.load(file)


        
# Agarwood_model = load_model('Agarwood_model_bestModel.h5') # loading model  
Agarwood_model = keras.models.load_model('F:/SubProjets/Agarwood/1121/backend/ML/Agarwood_model_bestModel.h5')


def prediction(arr):

    scalar = MinMaxScaler()
    scalar.fit(fit_data)
    arr = [arr]
    arr = scalar.transform(arr)
    data = pd.DataFrame(arr, columns =['1', '2', '3', '4', '5', '6', '7', '8'])
    results = Agarwood_model.predict(data)
    print("Prediction by model: {pred}".format(pred=results))
    pred_class = 1 if results > 0.5 else 0
    print(pred_class)
    # print(arr)
    sys.stdout.flush()



prediction(array)





# %%
#call these arr and method in the flask app
# arr = [25, 8, 32, 0, 2, 0, 0, 0]
# prediction(arr)
# test()


# %%



