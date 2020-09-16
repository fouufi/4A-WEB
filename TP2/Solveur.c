#include "Solveur.h"
#include <stdio.h>
#include <stdlib.h>

//TODO : création des variables écart+excès+artificielle
//création de la base initiale
//première phase si besoin
//optimisation avec la seconde phase
Solution* simplexe(Modele* modele){
	return NULL;
}

//TODO : passage d'une base à la suivante : on met à jour la structure via les étapes du cours (pas besoin de réallouer une structure, on met à jour les données de la base dans un certain ordre)
int iteration(Base* base, float* z){
	return 0;
}

void detruireBase(Base* base){
	if (!base) return;
	if (base->variables) free(base->variables);
	for (int i=0; i<base->lignes; i++) if (base->vecteurs[i]) free(base->vecteurs[i]);
	if (base->vecteurs) free(base->vecteurs);
	if (base->scores) free(base->scores);
	free(base);
}

void detruireSolution(Solution* solution){
	if (!solution) return;
	if (solution->values) free(solution->values);
	free(solution);
}

