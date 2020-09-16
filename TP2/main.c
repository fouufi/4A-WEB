#include <stdio.h>
#include <stdlib.h>

#include "Modele.h"
#include "Solveur.h"

int main(int argc, char** argv){
	if (argc<2){
		printf("Usage : %s inputFile\n", argv[0]);
		return 0;
	}

	Modele* modele = chargerModele(argv[1]);
	if (!modele) return 0;
	
	afficherModele(modele);
	
	Solution* solution = simplexe(modele);
	if (!solution){
		printf("Echec de l'optimisation...\n");
	}
	else{
		for (int i=0; i<modele->N; i++){
			printf("X%d = %.2f\n", i+1, solution->values[i]);
		}
		printf("\n");
		detruireSolution(solution);
	}
	
	detruireModele(modele);
	return 0;
}
