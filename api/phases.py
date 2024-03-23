

from api.graph import Substrate
from api.types import Phase


phases = {
    "1": Phase([
        Substrate(2, 2, 50),
        Substrate(4, 4, 50)
    ]),
    "2": Phase([
        Substrate(1, 1, 50),
        Substrate(3, 3, 50),
        Substrate(8, 2, 50)
    ]),
    "3": Phase([
        Substrate(9, 1, 50),
        Substrate(5, 3, 50),
        Substrate(2, 2, 50),
        Substrate(2, 2, 50)
    ]),
    "4": Phase([
        Substrate(3, 1, 50),
        Substrate(2, 3, 50),
    ]),
    "5": Phase([
        Substrate(7, 4, 50),
        Substrate(2, 8, 50),
        Substrate(6, 4, 50)
    ]),
}
