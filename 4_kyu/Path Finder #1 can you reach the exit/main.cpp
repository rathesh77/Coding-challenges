#include <iostream>
#include <string>
#include <stdlib.h>  
using namespace std;

void pathFinder(int[][100], int, int, int, int);
bool path_finder(string);

int main(int argc, char **argv)
{

    string maze = "...W....\nW..WW...\n..W.....\n.W...W..\n...WW...\n..W..W..\n....W.WW\nW...W...";
    std::cout << path_finder(maze) << endl;
}
bool path_finder(string maze)
{
    int nbLignes = 0;
    int nbColonnes = 0;
    for (int i = 0; i < maze.length(); i++)
    {
        if (maze[i] != '\n')
            nbColonnes++;
        else
            break;
    }
    for (int i = 0; i < maze.length(); i++)
    {

        if (maze[i] == '\n')
            nbLignes++;
    }
    nbLignes++;

    int arr[100][100] = {0};
    int lab[100][100] = {0};
    int cpt = 0;
    for (int i = 0; i < nbLignes; i++)
    {
        for (int j = 0; j < nbColonnes + 1; j++)
        {
            if (maze[cpt] == '.')
                arr[i][j] = 0;
            if (maze[cpt] == 'W')
                arr[i][j] = -1;
            if (maze[cpt] == '\n')
                arr[i][j] = -2;
            if (j < nbColonnes)
            {
                lab[i][j] = arr[i][j];
                cout << abs(lab[i][j]) << " ";
            }

            cpt++;
        }
        cout << endl;
    }

    lab[0][0] = 1;

    pathFinder(lab, nbLignes, nbColonnes, 0, 0);

    return (lab[nbLignes - 1][nbColonnes - 1] != 0);
}

void pathFinder(int lab[][100], int nbLignes, int nbColonnes, int i, int j)
{

    if (lab[nbLignes - 1][nbColonnes - 1] != 0)
        return;
    if (lab[i][j] != -1)
    {
        if (i + 1 >= 0 && i + 1 < nbLignes && lab[i + 1][j] != -1 && lab[i + 1][j] == 0)
        {
            lab[i + 1][j] = lab[i][j] + 1;
            pathFinder(lab, nbLignes, nbColonnes, i + 1, j);
        }
        if (j + 1 >= 0 && j + 1 < nbColonnes && lab[i][j + 1] != -1 && lab[i][j + 1] == 0)
        {
            lab[i][j + 1] = lab[i][j] + 1;
            pathFinder(lab, nbLignes, nbColonnes, i, j + 1);
        }
        if (i - 1 >= 0 && i - 1 < nbLignes && lab[i - 1][j] != -1 && lab[i - 1][j] == 0)
        {
            lab[i - 1][j] = lab[i][j] + 1;
            pathFinder(lab, nbLignes, nbColonnes, i - 1, j);
        }
        if (j - 1 >= 0 && j - 1 < nbColonnes && lab[i][j - 1] != -1 && lab[i][j - 1] == 0)
        {
            lab[i][j - 1] = lab[i][j] + 1;
            pathFinder(lab, nbLignes, nbColonnes, i, j - 1);
        }
    }
}
