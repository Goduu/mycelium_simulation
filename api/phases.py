

from api.graph import Substrate
from api.types import Phase


phases = {
    "1": Phase([
        Substrate(2, 2, 50),
        Substrate(4, 4, 20)
    ]),
    "2": Phase([
        Substrate(1, 1, 50),
        Substrate(3, 3, 20),
        Substrate(8, 2, 20)
    ]),
    "3": Phase([
        Substrate(9, 1, 50),
        Substrate(5, 3, 50),
        Substrate(2, 2, 50),
        Substrate(2, 2, 50)
    ]),
    "4": Phase([
        Substrate(3, 1, 150),
        Substrate(2, 3, 100),
    ]),
    "5": Phase([
        Substrate(7, 4, 150),
        Substrate(2, 8, 30),
        Substrate(6, 4, 100)
    ]),
}
