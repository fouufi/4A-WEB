#ifndef SOLVEUR_H
#define SOLVEUR_H
#include "Modele.h"

//Structure représentant une solution de base
typedef struct{
	int* variables; //indice des variables de la base, dimension M
	float** vecteurs; //lignes du tableaux, dimension M*N
	float* scores; //constantes de la dernière colonne de tableau, dimension M
	int lignes; //nombre de lignes (=M), correspond au nombre de contraintes <=> au nombre de variables dans la base
	int colonnes; //nombre de colonnes (=N+M+nbArtificielles) <=> toutes les variables du problèmes : variables de décisions, variables d'écart, variables d'excès et si besoin variables artificielles
} Base;

//Solution facilement traitable par la suite
typedef struct{
	float* values; //les valeurs de variables
	int N; //le nombre de variables
} Solution;

//Fonction principale, lance l'optimisation d'un problème et renvoie la solution optimale
Solution* simplexe(Modele* modele);
//Fonction permettant le passage d'une base à la suivante, en prenant pour paramètre les coefficients des variables dans l'objectif
int iteration(Base* base, float* z);
//Désallocation propre d'une base
void detruireBase(Base* base);
//Désallocation propre d'une solution
void detruireSolution(Solution* solution);

#endif
