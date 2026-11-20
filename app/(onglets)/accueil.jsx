// Onglet Accueil : vitrine, booster quotidien, puis liste des boosters.
import { ScrollView, View, Text } from 'react-native'
import Vitrine from '../../src/composants/Vitrine'
import BoosterQuotidien from '../../src/composants/BoosterQuotidien'
import CarteBooster from '../../src/composants/CarteBooster'
import { boosters } from '../../src/donnees/accueil'
import styles from '../../src/ecrans/Accueil.styles'
import EcranOnglet from '../../src/composants/EcranOnglet'

export default function EcranAccueil() {
  return (
    <EcranOnglet>
      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        <Vitrine />

        <View style={styles.section}>
          <BoosterQuotidien />
        </View>

        <View style={styles.sectionBoosters}>
          <Text style={styles.titreSection}>Boosters</Text>
          {boosters.map((booster) => (
            <CarteBooster key={booster.id} booster={booster} />
          ))}
        </View>
      </ScrollView>
    </EcranOnglet>
  )
}
